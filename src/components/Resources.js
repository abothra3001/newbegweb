import React, {Component} from 'react';
import * as Realm from "realm-web";
import Table from "./Table"
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

const REALM_APP_ID = "application-0-iarqd"
const app = new Realm.App({ id: REALM_APP_ID });
async function loginAnonymous() {
  // Create an anonymous credential
  const credentials = Realm.Credentials.anonymous();
  try {
    // Authenticate the user
    const user = await app.logIn(credentials);
    return user
  } catch(err) {
    console.error("Failed to log in", err);
  }
}
loginAnonymous().then(user => {
  console.log("Successfully logged in!", user)
})
const mongodb = app.currentUser.mongoClient("mongodb-atlas");
const housing = mongodb.db("resources").collection("housingInfo");
const food = mongodb.db("resources").collection("foodInfo")
const clothing = mongodb.db("resources").collection("clothingInfo")

let houseData=[], foodData=[], clothingData=[]

const houseColumns=[{
        Header: 'Housing',
        columns:[{
            Header: "Name",
            accessor: "name"
        },{
            Header: "Type",
            accessor: "housing"
        },{
            Header: "Phone",
            accessor: "phone"
        },{
            Header: "Other Contact",
            accessor: "contact"
        },{
            Header: "Address",
            accessor: "address"
        },{
            Header: "City",
            accessor: "city"
        },{
            Header: "Zip Code",
            accessor: "zip"
        },{
            Header: "County",
            accessor: "county"
        },{
            Header: "Notes",
            accessor: "notes"
        }]
}]

const foodColumns=[{
        Header: 'Food',
        columns:[{
            Header: "Name",
            accessor: "name"
        },{
            Header: "Type",
            accessor: "type"
        },{
            Header: "Address",
            accessor: "address"
        },{
            Header: "Phone",
            accessor: "phone"
        },{
            Header: "City",
            accessor: "city"
        },{
            Header: "Zip Code",
            accessor: "zip"
        },{
            Header: "County",
            accessor: "county"
        },{
            Header: "Notes",
            accessor: "notes"
        },{
            Header: "Site",
            accessor: "site"
        },{
            Header: "Timing",
            accessor: "timing"
        }]
}]

const clothingColumns=[{
        Header: 'Clothing',
        columns:[{
            Header: "Name",
            accessor: "name"
        },{
            Header: "Type",
            accessor: "type"
        },{
            Header: "Address",
            accessor: "address"
        },{
            Header: "Phone",
            accessor: "phone"
        },{
            Header: "City",
            accessor: "city"
        },{
            Header: "Zip Code",
            accessor: "zip"
        },{
            Header: "County",
            accessor: "county"
        },{
            Header: "Site",
            accessor: "site"
        },{
            Header: "Timing",
            accessor: "timing"
        },{
            Header: "Notes",
            accessor: "other"
        }]
}]

let findStuff=async({setData}, data, {setLoaded})=>{
    let entry = await housing.find({});
    entry.forEach(el=>{
        data.push(el)
    })
    setData(data)
    houseData = data
    entry = await food.find({});
    entry.forEach(el=>{
        foodData.push(el)
    })
    entry = await clothing.find({});
    entry.forEach(el=>{
        clothingData.push(el)
    })
    setLoaded(false)
}

export default function Resources() {
    const [data, setData] = React.useState([]);
    const [loading, setLoaded] = React.useState(true)
    const [tableCols, setTableCols] = React.useState(houseColumns)
    console.log("Res "+app.currentUser.id)
    if(loading){
        findStuff({setData}, data, {setLoaded})
    }
    return (
        <Container>
        <Button onClick={() => { setTableCols(houseColumns); setData(houseData); }} variant="contained" color="primary">
          Housing
        </Button>
        <Button onClick={() => { setTableCols(foodColumns); setData(foodData); console.log(foodData)}} variant="contained" color="primary">
          Food
        </Button>
        <Button onClick={() => { setTableCols(clothingColumns); setData(clothingData); }} variant="contained" color="primary">
          Clothing
        </Button>
        <br/><br/>
           {
                //name housing phone contact address city zip county notes
                loading?"Loading data...":<Table columns={tableCols} data={data} />
            }
        </Container>
    )
}
