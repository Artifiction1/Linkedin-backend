import PdfPrinter from "pdfmake"


export const getPDFReadableStream = usersArray => {
  const fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
    },
  }

  const printer = new PdfPrinter(fonts)

  const tableContent = [
    ["TITLE", "CATEGORY"],
    ...usersArray.map(user => {
      return [user.name, user.surname, user.bio, user.title, user.experiences]
    }),
  ]

  console.log(tableContent)

  const docDefinition = {
   
    content: [
      {
        style: "tableExample",
        table: {
          body: tableContent,
        },
      },
    ],

    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      subheader: {
        fontSize: 15,
        bold: true,
      },
    },
  }

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {})
  pdfReadableStream.end()

  return pdfReadableStream
}
