export default interface Api {
  id: string;
  name: string;
  visibility: "internal" | "public";
  description: string;
}
