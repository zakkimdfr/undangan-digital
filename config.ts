const CONFIG = {
  hero: "https://cfsoedqtdrmqptfcudra.supabase.co/storage/v1/object/sign/assets/hero.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mOGI5MGI1MS0wYzA1LTRkNTAtYmFkMS1jOWNiM2M4NWIzYTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvaGVyby5qcGciLCJpYXQiOjE3NTcxNDM4MjIsImV4cCI6MTc1OTczNTgyMn0.C978FosFbUG9BT0ckAuVL3-SjEi1cceR5244L6ZUuIU",
  couple: {
    photo: "https://cfsoedqtdrmqptfcudra.supabase.co/storage/v1/object/sign/assets/couple.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mOGI5MGI1MS0wYzA1LTRkNTAtYmFkMS1jOWNiM2M4NWIzYTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvY291cGxlLmpwZyIsImlhdCI6MTc1NzE1OTU3MCwiZXhwIjoxNzg4Njk1NTcwfQ.m_1CZP2heBvBHRe0AZvaabO7NDYa-07s5JHbMaPjFvI",
    bride: {
      photo: "https://cfsoedqtdrmqptfcudra.supabase.co/storage/v1/object/sign/assets/bride.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mOGI5MGI1MS0wYzA1LTRkNTAtYmFkMS1jOWNiM2M4NWIzYTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvYnJpZGUuanBnIiwiaWF0IjoxNzU3MTQzOTAxLCJleHAiOjE3ODg2Nzk5MDF9.NZrW6WLZkLwkR6PLKLCPgFQh9fyYkWRkzMX010y4_4U",
      name: "Salma Raudhatuljannati",
      parents: "Putri Kedua dari\nBapak H. Tedi Setiadi & Ibu Hj. Elly Nurlaely",
      insta: "https://www.instagram.com/salmaardhtl/"
    },
    groom: {
      photo: "https://cfsoedqtdrmqptfcudra.supabase.co/storage/v1/object/sign/assets/groom.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mOGI5MGI1MS0wYzA1LTRkNTAtYmFkMS1jOWNiM2M4NWIzYTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvZ3Jvb20uanBnIiwiaWF0IjoxNzU3MTU5NDA1LCJleHAiOjE3ODg2OTU0MDV9.fYXiFc-So2Dey9EsIvbnMwJVEKGRXIOncdA0IMKJC7Y",
      name: "Zakki Mudhoffar",
      parents: "Putra Ketiga dari\nBapak H. Yusuf Badri & Ibu Hj. Hafifah Rahmi P.",
      insta: "https://www.instagram.com/zakkimdfr/"
    },
    hashtag: "#KiSahSelamanya",
    cover: "https://cfsoedqtdrmqptfcudra.supabase.co/storage/v1/object/sign/assets/cover.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mOGI5MGI1MS0wYzA1LTRkNTAtYmFkMS1jOWNiM2M4NWIzYTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvY292ZXIuanBnIiwiaWF0IjoxNzU3MTU5NDI1LCJleHAiOjE3ODg2OTU0MjV9.72LIffmHvlaRKLnuLZDa5cDyQC7MgkoSAF6GFAQk_1s",
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
  music: { autoplay: true, src: "/public/music.mp3" },
};

export default CONFIG;