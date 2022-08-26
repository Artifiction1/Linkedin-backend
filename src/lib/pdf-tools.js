import PdfPrinter from "pdfmake"
import imageToBase64 from 'image-to-base64'

export const getPDFReadableStream = async user => {
  console.log("this is user:",user)
  const fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
    },
  }

  const printer = new PdfPrinter(fonts)


  const picture = await imageToBase64(user.image)

  const docDefinition = {
   
    content: [
      {text : user.name + " " + user.surname , fontSize: 20, style: 'header'},
      // {image: 'profilePic'}
        ],
//  images:{profilePic: `data:image/png;base64,${picture}`,
//   },
//styles: {
//  header: {
//    fontSize: 18,
//    bold: true,
//  },
//  subheader: {
//    fontSize: 15,
//    bold: true,
//  },
//},
}

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {})
  pdfReadableStream.toString()

  return pdfReadableStream
}
