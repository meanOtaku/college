const Club = require("../models/Club");
const Youtube = require("../models/youtube"); 



const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { link: '', person: '' };

  // duplicate email error
  if (err.code === 11000) {
    errors.link = 'that link is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}




const club_index = (req, res) => {
  Club.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('club', { clubs: result, title: 'All Clubs' });
    })
    .catch(err => {
      console.log(err);
    });
}

const club_details = async (req, res) => {
  var links = [] ;
  const id = req.params.id;
  await Youtube.find().sort({ createdAt: -1 })
  .then(result => {
    links = result
    console.log(links);
    console.log(req.url);
    console.log(req.params.id);
  })
  .catch(err => {
    console.log(err);
  });
  
  await Club.findById(id)
    .then(result => {
      res.render('club_details', { club: result, title: 'Club Details' , links : links });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Club not found' });
    });
}

const club_create_get = (req, res) => {
  res.render('create_club', { title: 'Create a new blog' });
}

const club_create_post = (req, res) => {
    const club = new Club(req.body);
    club.save()
      .then(result => {
        res.redirect('/clubs');
      })
      .catch(err => {
        console.log(err);
      });
  }

const club_delete = (req, res) => {
  const id = req.params.id;
  Club.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/clubs' });
    })
    .catch(err => {
      console.log(err);
    });
}

// const club_create_youtube_post = (req, res) => {
//   const youtube = new Youtube(req.body);
//   youtube.save()
//     .then(result => {
//       res.redirect('/clubs');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

const club_create_youtube_post = async (req, res) => {
  const { link , person , id} = req.body;

  try {
    if(Youtube.findById(link)){
      console.log("alrady there");
      res.redirect('/clubs');
    }
    else{
      const youtube = await Youtube.create({ link , person , id });
      //res.status(201).json({ id: youtube._id });
      res.redirect('/clubs');
    }
    
  }
  catch(err) {
    const errors = handleErrors(err);
    res.redirect('/404');
  }
 
}

// const club_search = (req,res, next) => {
//   const regex = new RegExp(req.query["term"], 'i');
//   const club = Club.find({name:regex}, {'name':1}).sort({"updated_at": -1}).sort({"created_at": -1}).limit(20);
//   club.exec(function(err, data){
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
  club_index, 
  club_details, 
  club_create_get, 
  club_create_post, 
  club_delete,
  club_create_youtube_post,
}