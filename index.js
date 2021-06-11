#!/usr/bin/node node
"use strict";
// AWS Setup
var AWS = require('aws-sdk');
AWS.config.update({region: 'REGION'});
const database = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const fetch = require('node-fetch')

/*
//https://www.google.com/maps/place/Hurts+Donut+Co./@41.5906877,-90.4613467,18.75z/data=!4m5!3m4!1s0x87e237589f7183cf:0x9ae594f08efebce7!8m2!3d41.5906647!4d-90.4610724
infraction = {
	site: string, // "www.google.com"
	path: string, // "maps/place/Hurts+Donut+Co./@41.5906877,-90.4613467,18.75z"
	params: string, // "data=!4m5!3m4!1s0x87e237589f7183cf:0x9ae594f08efebce7!8m2!3d41.5906647!4d-90.4610724"
	infraction: ??, //
	infractionID: xxxxx,
	reportedElement: String // HTML ID or <html element(s)>
}
*/

/*
event = {
	infractionID: xxxxx
}
*/
let main = async (event, context) => {
	console.log("EVENT: \n" + JSON.stringify(event, null, 2))
	console.log("CONTEXT: \n" + JSON.stringify(context, null, 2))
	
	// Get Infraction Data by ID
	//https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-table-read-write.html
	//const infraction = await ddb.getItem({
	//	TableName: 'TABLE',
	//	Key: {
	//		'KEY_NAME': {N: '001'}
	//	},
	//	ProjectionExpression: 'ATTRIBUTE_NAME'
	//})
	const infraction = {site: "www.serebii.net"}
	const redirect = await fetch(`http://${infraction.site}`)
	if (redirect.redirected) {
		console.log("Redirected")
		if (`https://${infraction.site}/` !== redirect.url) {
			console.log("Redirected to a different site")
		}
	} else {
		// Submit a new infraction that they did not redirect you to a https site!
		console.log("Not Redirected to HTTPS")
	}
}
//main()

exports.handler = main;

