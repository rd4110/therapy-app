import {pipeline} from "@xenova/transformers";
import express from 'express';
import {fileURLToPath} from 'url';
import path, { dirname } from 'path';

const _filename=fileURLToPath(import.meta.url);
const _dirname=path.dirname(_filename);

const pipe=await pipeline('sentiment-analysis');



const app=express();

app.use('/public',express.static('./public'));

app.use(express.json());



app.post('/',async(req,res)=>{
    const result=await pipe(req.body.text);
    res.json(result);

})

app.get('/',(req,res)=>{
    res.sendFile(path.join(_dirname,'index.html'));
})

app.listen(3000,()=>{
    console.log('server is listening on port: 3000');
})