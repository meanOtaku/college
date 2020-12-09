const Club = require("../models/Club");
const Youtube = require("../models/youtube"); 
const club_index = (req, res) => {
  Club.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('club', { clubs: result, title: 'All Clubs' });
    })
    .catch(err => {
      console.log(err);
    });
}

const club_details = (req, res) => {
  
  const id = req.params.id;
  Club.findById(id)
    .then(result => {
      res.render('club_details', { club: result, title: 'Club Details' });
      res.status(200).json({ club: club._id });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Club not found' });
      res.status(200).json({ club: club._id });
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

const club_create_youtube_post = (req, res) => {
  const youtube = new Youtube(req.body);
  //const id = req.params.id;
  youtube.save()
    .then(result => {
      //console.log(id)
      res.redirect('/clubs');
    })
    .catch(err => {
      console.log(err);
    });
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