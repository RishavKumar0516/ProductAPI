// what function we have to perform at certain routes will be defined here.

const Product = require("../models/product");

const getAllProducts = async (req, res) =>{

    //getting all data from backend
    //const myData = await Product.find({});

    //getting selected data from backend
    //const myData = await Product.find(req.query); 
    
    const { company, name, featured, sort, select } = req.query;
    const queryObject = {};

    if(company){
        queryObject.company = company;
    }

    if(name){
        //queryObject.name = name;

        //using regex
        queryObject.name = {$regex : name, $options: "i" };
    }

    if(featured){
        queryObject.featured = featured;
    }

    let apiData = Product.find(queryObject);

    if(sort){
        //let sortFix = sort.replace(",", " ");this not works on more then 2 fields
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }

    if(select){
        //let selectFix = select.replace(",", " ");
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }


    //pagination
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;

    let skip = (page-1) * limit;

    apiData = apiData.skip(skip).limit(limit);

     console.log(queryObject);



    //if user inputs the field which is not present in database then efficient way to return data
    const myData = await apiData;

    //res.status(200).json({msg: "I am getAllProducts"});
    //res.status(200).json({ myData});
    res.status(200).json({ myData, nbHits:myData.length});
};

const getAllProductsTesting = async (req, res) =>{
    //getting data from backend
    //const myData = await Product.find(req.query);
    //console.log(" ~file: product.js ~ line 10 ~ getAllProductsTesting ~ req.query", req.query);

    //getting data in sorted form according to name in ascending order
    //const myData = await Product.find(req.query).sort("name");

    //getting data in sorted form according to name in descending order
    //const myData = await Product.find(req.query).sort("-name");

    //getting data in sorted form according to price in descending order
    const myData = await Product.find(req.query).sort("-price");

    //res.status(200).json({msg: "I am getAllProductsTesting"});
    res.status(200).json({ myData});
};

module.exports = {getAllProducts, getAllProductsTesting};




/*req.query is a request object that is populated by request query strings that are found in a URL.
 These query strings are in key-value form. They start after the question mark? in any URL.
  And if there are more than one, they are separated with the ampersand&. See example below.*/

//using mongodb regex for searching full text search
// "i" represent case insensitive in regex

//"select" specifies which document field to include or exclude

/*to sort or select the api using multiple fields
In URL we write like this
sort=name,-price,featured
select=name,price,company

But in defining api we write like this
sort=name -price featured
select=name price company

so comma is replaced by space*/