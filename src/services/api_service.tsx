const baseUrl = "https://christmas-list-maker-api-production.up.railway.app/";

export const apiPost = async (slug: string, body: any) => {
    try {
        console.log('trying to connect to server')
        const response = await fetch(`${baseUrl}${slug}`, {
          headers: {
            "Content-Type": "application/json",
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