const {
  AuthenticationService,
  JWTStrategy,
} = require("@feathersjs/authentication");
const { LocalStrategy } = require("@feathersjs/authentication-local");
const { expressOauth } = require("@feathersjs/authentication-oauth");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const session = require("express-session");
const path = require("path");

module.exports = (app) => {
  const authentication = new AuthenticationService(app);

  authentication.register("jwt", new JWTStrategy());
  authentication.register("local", new LocalStrategy());

  // Configuración de la sesión
  app.use(
    session({
      secret: "yourSecretKey",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // Configuración de Passport.js
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "976773336253-5q6h9fcoqbqmmlpejtnni8gos9bb014a.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "https://api-aura.armortemplate.com/auth/google/callback",
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, done) {
        try {
          const userService = app.service("users");

          // Busca al usuario en la base de datos por googleId o email
          const result = await userService.find({
            query: {
              $or: [{ googleId: profile.id }, { email: profile.email }],
            },
          });

          let user;

          if (result.total === 0) {
            // Si el usuario no existe, lo crea
            user = await userService.create({
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.email,
              imagen: profile.picture,
              // requests: 200,
              // credits: 40,
              name: profile.displayName,
              // verified: true,
            });
          } else {
            // Si el usuario ya existe, lo usa
            user = result.data[0];
          }

          // Genera un token JWT para el usuario
          const payload = { userId: user._id.toString() };
          const jwt = await app
            .service("authentication")
            .createAccessToken(payload, {
              subject: user._id.toString(),
              issuer: "feathers",
            });

          // Adjunta el token al usuario
          user = { ...user, token: jwt };

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Serialización y deserialización de usuario
  passport.serializeUser(function (user, done) {
    done(null, user._id); // Usa _id si es MongoDB
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await app.service("users").get(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Rutas de autenticación
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/auth/google/failure",
    }),
    (req, res) => {
      console.log("req.user", req.user);
      // Redirige al éxito y pasa el token JWT
      res.redirect(
        `https://aura.armortemplate.com/autologin?token=${req.user.token}&user_id=${req.user._id}`
        // `http://localhost:9999/autologin?token=${req.user.token}&user_id=${req.user._id}`
      );
    }
  );

  //pico.charlygproducciones.com/auth/google/callback?code=4%2F0ATx3LY6TNvFQtpCV5u-D3G7oB16n2qFZB_wLgjNe6eoeb92oiHJHEBdfv6-RhIH02Bq7gA&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=4&prompt=consent

  // app.get("/auth/google/success", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/success.html"));
  // });

  // app.get("/auth/google/failure", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/failure.html"));
  // });

  // app.get("/", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/index.html"));
  // });

  app.use("/authentication", authentication);
  app.configure(expressOauth());
};
