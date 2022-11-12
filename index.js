const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Run your code here, after you have insured that the connection was made
    const shakshuka = await Recipe.create({
      title: "Shakshuka",
      level: "Easy Peasy",
      ingredients: [
        "1 tbsp olive oil",
        "2 red onions, chopped",
        "1 red chilli, deseeded and finely chopped",
        "1 garlic clove, sliced",
        "small bunch coriander stalks and leaves chopped separately",
        "2 cans cherry tomatoes",
        "1 tsp caster sugar",
        "4 eggs",
      ],
      cuisine: "Maghrebi",
      dishType: "main_course",
      image:
        "https://www.cozinhatecnica.com/wp-content/uploads/2014/10/shakshouka.jpg",
      duration: 25,
      creator:
        "According to some food historians, shakshuka originated in Yemen, while others claim it came from the Ottoman Empire.",
    });
    console.log(shakshuka.title);

    await Recipe.insertMany(data);
    data.forEach((element) => console.log(element.title));

    let updateRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
    console.log("Recipe has been updated:", updateRecipe);

    let deleteRecipe = await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Recipe deleted:", deleteRecipe);

    dbConnection.disconnect();
  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
