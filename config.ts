const CONFIG = {
  hero: "https://cfsoedqtdrmqptfcudra.supabase.co/storage/v1/object/sign/assets/hero.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mOGI5MGI1MS0wYzA1LTRkNTAtYmFkMS1jOWNiM2M4NWIzYTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvaGVyby5qcGciLCJpYXQiOjE3NTcxNDM4MjIsImV4cCI6MTc1OTczNTgyMn0.C978FosFbUG9BT0ckAuVL3-SjEi1cceR5244L6ZUuIU",
  couple: {
    photo: "/couple.jpg",
    bride: {
      photo: "https://cfsoedqtdrmqptfcudra.supabase.co/storage/v1/object/sign/assets/bride.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mOGI5MGI1MS0wYzA1LTRkNTAtYmFkMS1jOWNiM2M4NWIzYTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvYnJpZGUuanBnIiwiaWF0IjoxNzU3MTQzOTAxLCJleHAiOjE3ODg2Nzk5MDF9.NZrW6WLZkLwkR6PLKLCPgFQh9fyYkWRkzMX010y4_4U",
      name: "Salma Raudhatuljannati",
      parents: "Putri Kedua dari Bapak H. Tedi Setiadi & Ibu Hj. Elly Nurlaely",
      insta: "https://www.instagram.com/salmaardhtl/"
    },
    groom: {
      photo: "/groom.jpg",
      name: "Zakki Mudhoffar",
      parents: "Putra Ketiga dari Bapak H. Yusuf Badri & Ibu Hj. Hafifah Rahmi P.",
      insta: "https://www.instagram.com/zakkimdfr/"
    },
    hashtag: "#KiSahSelamanya",
    cover: "/cover.jpg",
  },
  events: [
    {
      type: "Akad Nikah",
      date: "2025-08-23",
      address:
        "Telah dilaksanakan di Istana Muara Jl. Muara Baru No.8, Situsaeur, Kec. Bojongloa Kidul, Kota Bandung, Jawa Barat 40234",
    },
    {
      type: "Tausiyah",
      date: "2025-09-14",
      time: "09:00 - 10:00 WIB",
      address:
        "Ust. Dr. H. Haris Muslim, Lc. MA\n\nGedung Haji Qornul Manazil, Jl. Ciganitri No. 2, Bojongsoang, Kab. Bandung 40287 ",
      mapUrl: "https://maps.app.goo.gl/FfmFUkKpT8PVXDhCA",
    },
    {
      type: "Resepsi",
      date: "2025-09-14",
      time: "10:00 - 14:00 WIB",
      address:
        "Gedung Haji Qornul Manazil, Jl. Ciganitri No. 2, Bojongsoang, Kab. Bandung 40287 ",
      mapUrl: "https://maps.app.goo.gl/FfmFUkKpT8PVXDhCA",
    },
  ],
  rsvp: { enabled: true, endpoint: "/api/rsvp" },
  gift: {
    enabled: true,
    accounts: [
      {
        logo: "/jago.png",
        bank: "Jago Syariah",
        name: "Salma Raudhatuljannati",
        number: "503812872434",
      },

      { 
        logo: "/mandiri.png",
        bank: "Mandiri",
        name: "Zakki Mudhoffar", 
        number: "1300020975309" 
      },
    ],
    address:
      "Jl. Ciganitri No. 13 RT01/RW04, Cipagalo, Bojongsoang, Kab. Bandung 40287",
  },
  gallery: {
    enabled: true,
    images: [],
  },
  music: { autoplay: false, src: "/music.mp3" },
};

export default CONFIG;