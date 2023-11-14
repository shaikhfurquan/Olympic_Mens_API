import MensRecordsModel from "../models/mensRecordModel.js";


//Adding the new record
const addMensRecords = async (req, res) => {
    const { ranking, name, dob, country, score } = req.body
    await MensRecordsModel.create({
        ranking,
        name,
        dob,
        country,
        score,
        user: req.user
    })
    res.status(201).json({
        success: true,
        message: "Mens Record added successfully..."
    })
}

//Gettign the record wrt to the current user(login)
const myMensRecords = async (req, res) => {
    //getting the current user id
    const userId = req.user._id
    const records = await MensRecordsModel.find({ user: userId })
    res.status(200).json({
        success: true,
        records
    })
}

//updating the blog wrt the current user(login)
const updateMensRecords = async (req, res) => {
    const { ranking, name, dob, country, score } = req.body

    //we will send the id by through the params, so need to pick the id first.
    const id = req.params.id
    const records = await MensRecordsModel.findById(id)

    //If we didn't find the records then
    if (!records) return res.status(404).json({
        success: false,
        message: "Invalid ID..."
    })

    records.ranking = ranking,
        records.name = name,
        records.dob = dob,
        records.create = country,
        records.score = score
    records.save()


    res.json({
        success: true,
        message: "Updating records",
        records
    })

}

const deleteMensRecords = async (req, res) => {
    const id = req.params.id
    console.log(id);
    const records = await MensRecordsModel.findById(id)

    //If we didn't find the records then
    if (!records) return res.status(404).json({
        success: false,
        message: 'Invalid Id'
    })

    await records.deleteOne()
    res.json({
        success: true,
        message: "Records deleted successfully..."
    })
}

const getAllRecords = async (req, res) => {
    const records = await MensRecordsModel.find()

    if (!records) return res.status(404).json({
        success: false,
        message: "There is no records"
    })

    res.json({
        success: true,
        message: "All Records",
        records
    })
}


const getRecordById = async (req, res) => {
    const id = req.params.id
    const record = await MensRecordsModel.findById(id)

    if (!record) return res.status(404).json({
        success: false,
        message: "Invalid ID"
    })

    res.json({
        success: true,
        message: "Your Record...",
        record
    })
}
export { addMensRecords, myMensRecords, updateMensRecords, deleteMensRecords, getAllRecords, getRecordById }