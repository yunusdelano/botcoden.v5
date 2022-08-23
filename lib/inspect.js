const { getBinaryNodeChild } = require("@adiwajshing/baileys");

const queryInvite = async (conn, code) => {
  const results = await conn.query({
    tag: "iq",
      attrs: {
        type: "get",
        xmlns: "w:g2",
        to: "@g.us",
      },
      content: [{ tag: "invite", attrs: { code } }],
    });
    return extractGroupInviteMetadata(results);
};

const extractGroupInviteMetadata = (content) => {
    const group = getBinaryNodeChild(content, "group");
    const descChild = getBinaryNodeChild(group, "description");
    let desc, descId;
    if (descChild) {
        desc = getBinaryNodeChild(descChild, "body")?.content?.toString();
        descId = descChild.attrs.id;
    }
    var member = []
    Object.keys(group.content).forEach((i) => {
       if (group.content[i].tag == 'participant') {
         member.push({ id: group.content[i].attrs.jid, type: group.content[i].attrs.type ? group.content[i].attrs.type : 'member' })
       }
    })
    const groupId = group.attrs.id.includes("@") ? group.attrs.id : group.attrs.id + "@g.us";
    const metadata = {
        id: groupId,
        subject: group.attrs?.subject,
        creator: group.attrs?.creator,
        creation: group.attrs?.creation,
        size: group.attrs?.size,
        desc,
        descId,
        participants: member
    };
    return metadata;
};

module.exports = async(conn, code) => {
  var check = await queryInvite(conn, code).catch(async (e) => {
    throw Error(`${e}`)
  })
  return check
}
