import { useParams } from "react-router-dom";
import CardsMateria from "../components/CardsMateria";
import { getApuntes } from "../services/StrapiService";
import { CSSProperties, useEffect, useState } from "react";
import { Apunte } from "../types";
import ScaleLoader from "react-spinners/ScaleLoader";

const override: CSSProperties = {
  display: "block",
  margin: "40px 0px 0px 0px",
  borderColor: "red",
};

export default function PaginaAño() {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<Apunte>();

  const { year } = useParams<{ year: string }>();

  useEffect(() => {
    setLoading(true);
    setData(undefined);
    const fetchData = async () => {
      try {
        const data = await getApuntes(`${year}`);
        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [year]);

  return (
    <div className="w-full flex flex-col flex-nowrap gap-3 lg:py-12 items-center justify-center">
      <h1 className="text-lg xl:text-2xl font-medium bg-indigo-950 w-full px-5 py-3 text-white text-center">
        {year?.toUpperCase()} AÑO
      </h1>

      <ScaleLoader
        color="#1e1a4d"
        loading={loading}
        cssOverride={override}
        width={10}
        height={40}
      />

      {data?.data.length === 0 ? (
        <p className="text-lg xl:text-2xl font-medium bg-indigo-950 w-full px-5 py-3 text-white text-center">
          No hay apuntes para este año
        </p>
      ) : (
        <div className="w-full mt-6 md:mt-10 xl:mt-16 px-7 md:px-22 xl:px-32">
          <div className=" flex flex-wrap justify-center gap-8 md:gap-10 xl:gap-16">
            {data?.data.map((apunte) => (
              <CardsMateria key={apunte.materia} data={apunte} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
