const express = require("express")
const router = express.Router();
const passport = require("passport");
// const validateQuestionInput = require('../../validation/question');
// const validateResponse = require('../../validation/response')
const List = require('../../models/List');
const User = require('../../models/User');

// router.get('/test', (req, res) => {
//     res.json({ msg: "This is the list route" })
// })

//retreiving all the lists
router.get('/',(req,res) => {
    
    List.find()
    // .populate('user')
    // .populate({
    //     path: 'responses',
    //     populate: {
    //         path: 'user',
    //         model: 'User'
    //     }
    // })
    .sort({timestamps:-1})
    .then(lists => {res.json(lists)})
    .catch(err => res.status(404).json(err));
});


//posting lists
router.post('/', passport.authenticate('jwt',{session:false}), async (req,res) =>{
        //check validation
        // const {errors, isValid} = validateQuestionInput(req.body);
        //  if (!isValid) {
        //      return res.status(400).json(errors);
        //  }
              
        const newList = new List({
            list: req.body.list
        });
        
        newList.save().then(list => res.json(list))
        
      }
    
);




router.patch("/:id", passport.authenticate('jwt',{session:false}), async (req, res) => {
    try {
        let list = await List.findById(req.params.id);
            // .populate('user')
            // .populate({
            //     path: 'responses',
            //     populate: {
            //         path: 'user',
            //         model: 'User'
            //     }
            // })

        // if(req.user.id ===  `${question.user._id}`){
        
            if (req.body.list) {
                list.list = req.body.list
            }
            
            await list.save()
            res.send(list)
            
        // }else {
        // res.status(404).json({
        //     error: 'Incorrect user'
        // })

	} catch(err){
        res.status(404).json({
            error: "List doesn't exist!"
        })
    }
})



//deleting a question
router.delete("/:id", passport.authenticate('jwt',{session:false}), async (req, res) => {

    const list = await List.findOne({ _id: req.params.id })

    if(list) {
        // if (`${question.user}` === req.user.id){
            List.findByIdAndDelete(req.params.id)
            // .then(  async () => {

            //     let users = []; 

            //     users.push(question.user)

            //     question.responses.forEach(response => {
            //         users.push(response.user)
            //     })

            //     users.forEach(async user => {
            //         let questionUser = await User.findById(user._id)
            //         let questionIdx = questionUser.questions.indexOf(question._id)
            //         questionUser.questions.splice(questionIdx, 1)
            //         await questionUser.save()
            //     } )

            // }
            // )
            .then(() => res.json(list))
            .catch(err => res.status(404).json(err))
        // } else{
        //     res.status(404).json({error: 'Incorrect user'})
        // }
    } else {
        res.json("list not found")
    }
})

module.exports = router;


