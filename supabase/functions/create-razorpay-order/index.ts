
// Use Deno.env for environment variables
const RAZORPAY_KEY_ID = ("rzp_live_ElBuC12GFI2sU2")!;
const RAZORPAY_KEY_SECRET = ("oRdEgY5odh5h4ItmB5YwAp6X")!;


serve(async (req) => {
  try {
    const { amount } = await req.json();

    // Create order payload
    const body = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    // Call Razorpay Orders API directly from Deno
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`),
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
});
function serve(arg0: (req: any) => Promise<Response>) {
  throw new Error("Function not implemented.");
}

