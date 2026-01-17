import { getSections } from "@/lib/cms";
import ContactClient from "./ContactClient";

export default async function Contact() {
    const sectionsMap = await getSections();

    // MapをオブジェクトとしてシリアライズしてClientコンポーネントに渡す
    const sectionsObj: Record<string, string> = {};
    sectionsMap.forEach((value, key) => {
        sectionsObj[key] = value;
    });

    return <ContactClient sections={sectionsObj} />;
}
