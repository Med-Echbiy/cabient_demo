import { client } from "@/sanity/lib/client";
import toast from "react-hot-toast";

export default async function checkClient(name: string) {
  console.log(name);
  try {
    const search = await client.fetch(
      `*[ _type == 'client' && fullName == '${name}' ]`
    );
    console.log(search);
    if (search.length < 1) {
      toast.error("Client non trouvé");
      return false;
    } else {
      toast.success("found");
      return search[0]._id;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}
