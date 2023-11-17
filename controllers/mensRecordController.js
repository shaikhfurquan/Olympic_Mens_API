import MensRecordsModel from "../models/mensRecordModel.js";


//Adding the new record
const addMensRecords = async (req, res) => {
    try {
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

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while adding records...",
            error
        })
    }
}

//Gettign the record wrt to the current user(login)
const myMensRecords = async (req, res) => {
    try {
        //getting the current user id
        const userId = req.user._id
        const records = await MensRecordsModel.find({ user: userId })
        res.status(200).json({
            success: true,
            records
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while getting the record...",
            error
        })
    }
}

//updating the blog wrt the current user(login)
const updateMensRecords = async (req, res) => {

    try {

        const { ranking, name, dob, country, score } = req.body

        //we will send the id by through the params, so need to pick the id first.
        const id = req.params.id
        const records = await MensRecordsModel.findByIdAndUpdate(id , req.body)

        //If we didn't find the records then
        if (!records) return res.status(404).json({
            success: false,
            message: "Invalid ID..."
        })

        // records.ranking = ranking,
        //     records.name = name,
        //     records.dob = dob,
        //     records.create = country,
        //     records.score = score

        records.save()
        res.json({
            success: true,
            message: "Updating records",
            records
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while Updating the records...",
            error
        })
    }

}

const deleteMensRecords = async (req, res) => {
    try {
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

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while deleting records...",
            error
        })
    }
}

const getAllRecords = async (req, res) => {
    try {
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

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while getting all the records...",
            error
        })
    }
}


const getRecordById = async (req, res) => {
    try {
        const id = req.params.id
        const record = await MensRecordsModel.findById(id)

        if (!record) return res.status(404).json({
            success: false,
            message: "Invalid ID"
        })

        res.json({
            success: true,
            message: "Your Record is...",
            record
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while getting the records by Id...",
            error
        })
    }
}
export { addMensRecords, myMensRecords, updateMensRecords, deleteMensRecords, getAllRecords, getRecordById }