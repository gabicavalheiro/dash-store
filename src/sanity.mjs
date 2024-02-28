import { createClient } from '@sanity/client';

 const client =  createClient({
 
    projectId: "459itjlh",
    dataset: 'production',
    apiVersion: '2024-02-28',
    useCdn: false,
    token: 'sk0062gRoxfPWBqXKpkjEnLXRR6A426Qgvt3grhfCA8ommyQZ33LyCzOsDaFaBUiFHlZYkt6S2Zo6SXCGvN93Mx2XyT7SJNdGf0JJRgHOWXV3Fhy47hgW6KibOZLynt1DMXggxMcNaK5e3B9lVEVloT7AjrRykYLEBF4EB96x4zOkfdPbHGJ'
  
})

export default client


