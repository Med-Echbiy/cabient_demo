import { Toaster } from "react-hot-toast";
import Calender from "../../src/Calender";
import { client } from "@/sanity/lib/client";
import { reservation } from "@/src/types/reservation";
import { service } from "@/src/types/services";
import ClientWrapper from "@/src/common/ClientWrapper";
import Sidebar from "@/src/common/SideBar";
import { BsFillCalendar2DateFill } from "react-icons/bs";

interface events {
  title: string;
  end: Date;
  start: Date;
  _id?: string;
  event_id: string;
  service: string;
  unite: string;
  client_id: string;
  color: string;
}
export const dynamic = "force-dynamic";
export default async function Home() {
  // const services = ()=> {}
  const res: reservation[] = await client.fetch(`*[ _type == "reservation" ]`, {
    cache: "no-store",
  });
  console.log(res.length, "is it cached");
  const service: service[] = await client.fetch(`*[_type == 'services' ]`, {
    cache: "no-store",
  });

  const response: events[] = res.map((e) => ({
    event_id: e.event_id,
    start: new Date(e.start),
    end: new Date(e.end),
    title: e.title,
    service: e.service._ref,
    unite: e.doctors._ref,
    assets: e.assets || [],
    client_id: e.client._ref,
    color: e.color,
  }));

  const users: { fullName: string }[] = await client.fetch(
    "*[_type == 'client']{ fullName }",
    { cache: "no-store" }
  );

  return (
    <main className="flex relative flex-col justify-center min-h-full  ">
      <div className=" ">
        <div className="flex w-full">
          <div className="flex-grow max-w-fit">
            <ClientWrapper>
              <Sidebar />
            </ClientWrapper>
          </div>
          <div className="mx-auto w-full flex  flex-grow flex-col gap-y-4 pt-3">
            <h1 className="text-3xl flex items-center gap-3 p-4  capitalize">
              <p>calendrier de rendez-vous</p>
              <p>
                <BsFillCalendar2DateFill size={24} />
              </p>
            </h1>

            <Calender service={service} events={response} users={users} />
          </div>
        </div>
      </div>
      <Toaster />
    </main>
  );
}
