let Decoder = new TextDecoder()
let Encoder = new TextEncoder()

async function sexFactor(name1: string, name2: string): Promise<Response> {
  if (name1.toLowerCase() == name2.toLowerCase()) return new Response(`Try lovin' someone else, ${name1}!`)
  
  let data1 = Encoder.encode(name1.toLowerCase())
  let data2 = Encoder.encode(name2.toLowerCase())
  let hash1 = await crypto.subtle.digest('SHA-256', data1)
  let hash2 = await crypto.subtle.digest('SHA-256', data2)
  let view1 = new DataView(hash1)
  let view2 = new DataView(hash2)
  
  let xored = view1.getUint8(0) ^ view2.getUint8(0)
  
  let x = xored >>> 1 // 0..127
  let n = x - 16 // -16..111

  let answer = `${name1} and ${name2} have ${n}% sex factor!`
  if (n >= 100) answer += ` CurseLit HOT HOT HOT!!! CurseLit`
  
  return new Response(answer)
}

addEventListener('fetch', event => {
  let [_, name1, name2] = new URL(event.request.url).pathname.split('/')
  console.log('fetch', name1, name2)
  event.respondWith(sexFactor(name1, name2))
})
