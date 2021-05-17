'use strict';

const faker = require('faker');
const uuid = require('uuid').v4;
const AWS = require('aws-sdk');
const { Producer } = require('sqs-producer');
const { Consumer } = require('sqs-consumer');

AWS.config.update({ region: 'us-west-2' });
const sns = new AWS.SNS();
const topic = 'arn:aws:sns:us-west-2:779275272313:testSNS';


const orderDetails = {
  orderId: faker.datatype.uuid(),
  customerName: faker.name.findName(),
  address: faker.address.streetAddress()
}

const payload = {
  Message: (`ID: ${JSON.stringify(orderDetails.orderId)}, 
    NAME: ${JSON.stringify(orderDetails.customerName)}, 
    ADDRESS: ${JSON.stringify(orderDetails.address)} `),
  TopicArn: topic,
};

setInterval( async () => {
  sns
  .publish(payload)
  .promise()
  .then(data => {
    console.log(data);
  })
  .catch(console.error);
}, 5000 )
