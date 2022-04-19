const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');

const validate = require('./validate');
const { createToken } = require('../../utils/jwt');

const { checkUserByEmail, addUser, getUser } = require('./service');

/***************************************************** */
// add meal
const checkValues = (data) => {
  const title = data.title?.length ? data.title : 'Title';
  const ingrediants = data.ingrediants?.length
    ? data.ingrediants
    : 'ingrediants';
  const description = data.description?.length
    ? data.description
    : 'description';
  const category = data.category?.length ? data.category : 'category';
  const price = data.price?.length ? data.price : 'price';
  const cookingTime = data.cookingTime?.length
    ? data.cookingTime
    : 'cookingTime';
  const servings = data.servings?.length ? data.servings : 'servings';
  const topMeal = data.topMeal?.length ? data.topMeal : 'topMeal';
  const photo = data.photo?.length ? data.photo : 'photo';
  return {
    title,
    ingrediants,
    description,
    category,
    price,
    cookingTime,
    servings,
    topMeal,
    photo,
  };
};

exports.addMeal = async (req, res) => {
  if (req.method == 'POST') {
    const { error } = validate.validateMealSchema(req.body);
    const {
      title,
      ingrediants,
      description,
      category,
      price,
      cookingTime,
      servings,
      topMeal,
      photo,
    } = checkValues(req.body);
    if (error) {
      res.render('addMeal', {
        pageTitle: 'add meal',
        title: title,
        ingrediants: ingrediants,
        description: description,
        category: category,
        price: price,
        cookingTime: cookingTime,
        servings: servings,
        topMeal: topMeal,
        photo: photo,
        validError: error.details[0].message,
      });
    }
    // else {
    //   try {
    //     const userExist = await checkUserByEmail(req.body.email);
    //     if (userExist) {
    //       res.render("signup", {
    //         pageTitle: "Sign Up",
    //         firstName: firstName,
    //         lastName: lastName,
    //         email: email,
    //         password: password,
    //         validError: "This email is already registered",
    //       });
    //     }
    //     const data = await addUser(req.body);

    //     const msg = {
    //       to: email,
    //       from: "pkomal1@myseneca.ca",
    //       subject: "Welcome to the AwesomeFood",
    //       text: "Well done. By signing up, you've taken your first step towards a happier, healthier life. We'll do everything we can to provide you a healthier and tastier meal that meets your expectations.",
    //     };

    //     sgMail.send(msg);

    //     res.render("login", {
    //       pageTitle: "Login",
    //       succMsg:
    //         "Hi " +
    //         firstName +
    //         " " +
    //         lastName +
    //         "! Kindly check your email " +
    //         email +
    //         " for a message.",
    //       //cont: "Continue",
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    res.render('welcome', {
      pageTitle: 'welcome',
      shortMsg: 'your meal is added ',
    });
  }
};

// Login
exports.login = async (req, res) => {
  if (req.method == 'POST') {
    const { error } = validate.validateUserLoginSchema(req.body);
    const { email, password } = checkValues(req.body);
    if (error) {
      res.render('login', {
        pageTitle: 'Sign In',
        email: email,
        password: password,
        validError: error.details[0].message,
      });
    } else {
      try {
        const user = await checkUserByEmail(req.body.email);
        if (!user)
          res.render('login', {
            pageTitle: 'Sign In',
            email: email,
            password: password,
            validError: 'email doesnot exist',
          });
        const isPasswordCorrect = await bcrypt.compare(
          req.body.password,
          user.password
        );

        if (!isPasswordCorrect) {
          res.render('login', {
            pageTitle: 'Sign In',
            email: email,
            password: password,
            validError: 'Password Incorrect',
          });
        }
        const result = await getUser(user._id);
        const token = createToken(result);

        //console.log(token);
        //localStorage.setItem("token", token);
        // if (typeof window !== "undefined") {
        //   console.log("we are running on the client");
        // } else {
        //   console.log("we are running on the server");
        // }
        // res.render("welcome", {
        //   pageTitle: "Wellcome",
        //   succMsg: "Login Success",
        //   cont: "Continue",
        //   token: token,
        //   userName: user.firstName,
        // });
        res.redirect('welcome');
      } catch (error) {
        console.log(error);
        res.render('login', {
          pageTitle: 'Sign IN',
          email: email,
          password: password,
          validError: error,
        });
      }
    }
  }
};
