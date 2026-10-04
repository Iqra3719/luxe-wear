export const socials = {
  whatsapp: "923060651768",
  whatsappLink: "https://wa.me/923060651768",
  youtube: "https://youtube.com/@luxe_wear4544?si=NmIQs8w8-RSWzaWI",
  instagram: "luxe_wear_pk",
  email: "luxewearpk@gmail.com",
};

export const instagramLink = `https://instagram.com/${socials.instagram}`;

/** Build a WhatsApp order link pre-filled with a product name. */
export function whatsappOrderLink(productName: string) {
  const text = encodeURIComponent(`I want ${productName}`);
  return `${socials.whatsappLink}?text=${text}`;
}
