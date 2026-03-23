import 'dotenv/config'
import app from './app.js'
import { connectDB } from './config/db.js';

async function main(){
    try {
        await connectDB();
        app.listen(process.env.PORT || 5000, () => {
            console.log("Activado")
        })
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message)
        }
    }
}

main();