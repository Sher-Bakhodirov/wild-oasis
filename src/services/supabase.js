import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://chiqvgwwkipmnobrwzco.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoaXF2Z3d3a2lwbW5vYnJ3emNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY2MzE3MjMsImV4cCI6MjAzMjIwNzcyM30.tYZ4p_vW7_8GIEEMtbjCSsOQWUzXlGDzvzuVCEZinsQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
