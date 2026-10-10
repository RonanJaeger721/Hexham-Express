# Hexham Bricks / Hexham Express

Next.js company website using supplied Hexham photography, original logo crops and company video.

## Run locally

npm install
npm run dev -- --port 3107

## Build

npm run build
npm start -- --port 3107

## Enquiry flow

POST /api/enquiry validates customer details and returns a prepared WhatsApp URL. The customer reviews and sends the message in WhatsApp. This website does not store enquiries or claim that a quote has been sent. A future CRM/email adapter can replace the route response and contact form delivery handling.

## Content

Product groups are enquiry categories. Prices, technical specifications, stock, coverage and transport availability must be confirmed directly with the business. No invented statistics, address or delivery guarantees are included.

## Media

The supplied logo identity is preserved with its original background. Photos are compressed into responsive WebP pairs; some lower-edge phone/date watermarks are cropped naturally. The original company MP4 is preserved.
