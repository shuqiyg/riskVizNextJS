import Image from 'next/image'
import { Inter } from 'next/font/google'
import fs from "fs";
import csv from "csv-parser";

const inter = Inter({ subsets: ['latin'] })

export default function Home({data}) {
  console.log(">>>", data)
  const riskData = data
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
       Map goes here
      </div>
      <ul>
        {riskData.map((row, index) => (
          <li key={index}>{JSON.stringify(row["Lat"])}..{JSON.stringify(row["Long"])}</li>
        ))}
      </ul>
    </main>
  )
}

export async function getServerSideProps() {
  const data = await new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream("src/sample_data.csv")
      .pipe(csv())
      .on("data", (row) => {
        results.push(row);
      })
      .on("end", () => {
        console.log("CSV file successfully processed.");
        resolve(results);
      })
      .on("error", (error) => reject(error));
  });

  return {
    props: {
      data,
    },
  };
}
// export async function getServerSideProps() {
//   const data = [];
//   fs.createReadStream("src/sample_data.csv")
//     .pipe(csv())
//     .on("data", (row) => {
//       data.push(row);
//     })
//     .on("end", () => {
//       console.log("CSV file successfully processed.");
//       console.log(data[4089])
//     });
//   return {
//     props: {
//       data,
//     },
//   };
// }

