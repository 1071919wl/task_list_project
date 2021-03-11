const express = require("express")
const router = express.Router();
const passport = require("passport");
// const validateQuestionInput = require('../../validation/question');
// const validateResponse = require('../../validation/response')
const Task = require('../../models/Task');
const User = require('../../models/User');

// router.get('/test', (req, res) => {
//     res.json({ msg: "This is the list route" })
// })

//retreiving all the lists
router.get('/',(req,res) => {
    
    Task.find()
    // .populate('user')
    // .populate({
    //     path: 'responses',
    //     populate: {
    //         path: 'user',
    //         model: 'User'
    //     }
    // })
    .sort({timestamps:-1})
    .then(tasks => {res.json(tasks)})
    .catch(err => res.status(404).json(err));
});

//retreiving one task
router.get('/:id',(req,res)=>{
    Task.findById(req.params.id)
    // .populate({
    //     path: 'responses',
    //     populate: {
    //         path: 'user',
    //         model: 'User'
    //     }
    // })
    
    .then(task => res.json(task))
    .catch(err => res.status(404).json("task not found"))
})



//posting tasks
router.post('/', passport.authenticate('jwt',{session:false}), async (req,res) =>{
        //check validation
        // const {errors, isValid} = validateQuestionInput(req.body);
        //  if (!isValid) {
        //      return res.status(400).json(errors);
        //  }
              
        const newTask = new Task({
            task: req.body.task
        });
        
        newTask.save().then(task => res.json(task))
        
      }
    
);




router.patch("/:id", passport.authenticate('jwt',{session:false}), async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
            // .populate('user')
            // .populate({
            //     path: 'responses',
            //     populate: {
            //         path: 'user',
            //         model: 'User'
            //     }
            // })

        // if(req.user.id ===  `${question.user._id}`){
        
            if (req.body.task) {
                task.task = req.body.task
            }
            
            await task.save()
            res.send(task)
            
        // }else {
        // res.status(404).json({
        //     error: 'Incorrect user'
        // })

	} catch(err){
        res.status(404).json({
            error: "Task doesn't exist!"
        })
    }
})



//deleting a question
router.delete("/:id", passport.authenticate('jwt',{session:false}), async (req, res) => {

    const task = await Task.findOne({ _id: req.params.id })

    if(task) {
        // if (`${question.user}` === req.user.id){
            Task.findByIdAndDelete(req.params.id)
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
            .then(() => res.json(task))
            .catch(err => res.status(404).json(err))
        // } else{
        //     res.status(404).json({error: 'Incorrect user'})
        // }
    } else {
        res.json("task not found")
    }
})


//! comments
router.post("/:id/comments", passport.authenticate('jwt',{session:false}), async (req, res) => {
    
    let task = await Task.findById(req.params.id)

    // const { errors, isValid } = validateResponse(req.body);

    if (task) {

        // if (!isValid) {

        //     return res.status(400).json(errors)

        // } else {


            task.comments.push(Object.assign(req.body, {user: req.user.id}))
            task.save( function (err) {
                if (!err) res.json(task)
            })

            // let user = await User.findById(req.user.id)

            // let existingID = user.questions.find(id => id.toString() === question._id.toString())
            
            // if(!existingID) {
            //     user.comments.push(question._id)
            //     user.save()
            // } else {
            //     null
            // }

        }

    // } else {
    //     res.json("question does not exist.")
    // }
})

// router.delete("/:questionId/responses/:responseId", passport.authenticate('jwt',{session:false}), async (req, res) => {
//     let question = await Question.findById(req.params.questionId);
//     let response = await question.responses.id(req.params.responseId)
//     let user = await User.findById(response.user)

//     if(question && response) {

//         if (`${response.user}` === req.user.id){
       
//             question.responses.id(req.params.responseId).remove();
//             question.save(function (err) {
//                 res.json(response)
//             })

//             let questionIdx = user.questions.indexOf(question._id)
//             user.questions.splice(questionIdx, 1)
//             await user.save()
            
//         } else{
//             res.status(404).json('You can only delete your own responses.')
//         }
        
//     } else {
//         res.json("question and/or response does not exist.")
//     }
// })

module.exports = router;


