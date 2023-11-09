import { Toaster } from "react-hot-toast";
import Calender from "../../src/Calender";
import { client } from "@/sanity/lib/client";
import { reservation } from "@/src/types/reservation";
import { service } from "@/src/types/services";

interface events {
  title: string;
  end: Date;
  start: Date;
  _id?: string;
  event_id: string;
  service: string;
  unite: string;
  client_id: string;
}

export default async function Home() {
  // const services = ()=> {}
  const res: reservation[] = await client.fetch(`*[ _type == "reservation" ]`, {
    next: {},
  });

  const service: service[] = await client.fetch(`*[_type == 'services' ]`);
  const response: events[] = res.map((e) => ({
    event_id: e.event_id,
    start: new Date(e.start),
    end: new Date(e.end),
    title: e.title,
    service: e.service._ref,
    unite: e.doctors._ref,
    assets: e.assets || [],
    client_id: e.client._ref,
  }));
  const users: { fullName: string }[] = await client.fetch(
    "*[_type == 'client']{ fullName }"
  );
  console.log("#####");
  console.log(users);

  return (
    <main className="flex relative flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="mx-auto sm:w-full ">
        <Calender service={service} events={response} users={users} />
      </div>
      <Toaster />
    </main>
  );
}
