const Blog = require('../models/blog');
const Links = require('../models/links');

const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_details = async (req, res) => {
  var links = [] ;
  const id = req.params.id;
  console.log(req.params.id);
  await Links.find({id: id}).sort({ createdAt: -1 })
  .then(result => {
    links = result
    console.log(links);
  })
  .catch(err => {
    console.log(err);
  });
  
  
   await Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' , links : links});
      //res.status(200).json({ blog: blog._id });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Blog not found' });
      //res.status(200).json({ blog: blog._id });
    });
}

const blog_create_get = (req, res) => {
  res.render('create', { title: 'Create a new blog' });
}

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_delete = (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  console.log(id);
  Links.deleteMany({id: id})
    .then(result => {

      console.log("DELETED")
      //res.json({ redirect: '/clubs' });
    })
    .catch(err => {
      console.log(err);
    });
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}


   const blog_create_link_post = async (req, res) => {
     const links = new Links(req.body);
     if(Links.findById(links.link) == 1){
      console.log("alrady there");
      res.redirect('/blogs');
     }
     else{
      await links.save()
      .then(result => {
       res.redirect('/blogs');
    })
    .catch(err => {
        console.log(err);
      });
     } 
  }

const blog_search_get = async (req, res) => {
  const searchField = req.query.title;
  console.log("searching");
  console.log(searchField);
   await Blog.find({title:{$regex: searchField,$options: '$i'}})
   .then(data=>{
      res.render('search', { results: data, title: 'Found Blog'});
      //res.json(data);
      console.log(data);
     //res.send(data);
   })
   .catch(err => {
    console.log(err);
  });
}


// const blog_search = (req,res, next) => {
//   const regex = new RegExp(req.query["term"], 'i');
//   const blog = Blog.find({name:regex}, {'name':1}).sort({"updated_at": -1}).sort({"created_at": -1}).limit(20);
//   blog.exec(function(err, data){
//     console.log(data);
//     const result = [];
//     if(!err){
//       if(data && data.length && data.length> 0){
//         data.forEach(user => {
//           let obj = {
//             id: user._id,
//             label: user.name,
//           };
//           result.push(obj);
//         });
//       }
//     }
//     res.jsonp(result);
//   });
// }

module.exports = {
  blog_index, 
  blog_details, 
  blog_create_get, 
  blog_create_post, 
  blog_delete,
  blog_create_link_post,
  blog_search_get,
}