const baseUrl = "https://christmas-list-maker-api-production.up.railway.app/";
// const baseUrl = 'http://localhost:3009/';

export const apiPost = async (slug: string, body: any) => {
    try {
        console.log('trying to connect to server')
        const response = await fetch(`${baseUrl}${slug}`, {
          headers: {
            "Content-Type": "application/json",
            //  "Access-Control-Allow-Origin": baseUrl
          },
          method: "POST",
          mode: "cors",
          credentials: "include",
          body: JSON.stringify(body),
        });
        if (!response.ok) {
            console.log("error fetching data");
        }
        else {
            const responseJson = await response.json();
            console.log('API SUCCESS');
            console.log(responseJson);
            return responseJson;
        }
    } catch (err) {
        console.log(err)
    }
}