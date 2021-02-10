const club_delete = (req, res) => {
  const id = req.params.id;
  // Youtube.findByIdAndDelete(id)
  //   .then(result => {
  //     console.log("DELETED")
  //     //res.json({ redirect: '/clubs' });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  Club.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/clubs' });
    })
    .catch(err => {
      console.log(err);
    });
}