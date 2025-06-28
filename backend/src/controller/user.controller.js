import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getRecommendedUsers = async (req, res) => {
  try {
    const currentUser = req.user;
    const currentUserId = req.user.id;
    const recommendedUsers = await prisma.user.findMany({
      where: {
        id: {
          not: currentUserId,
          notIn: currentUser.friends.map((friend) => friend.id),
        },
        isOnboarded: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Recommended users fetched successfully",
      recommendedUsers,
    });
  } catch (error) {
    console.error("Error in getRecommendedUsers controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export async function getMyFriends(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        friends: {
          select: {
            id: true,
            fullName: true,
            profilePic: true,
            nativeLanguage: true,
            learningLanguage: true,
          },
        },
      },
    });
    res.status(200).json({
      success: true,
      message: "Friends fetched successfully",
      friends: user.friends,
    });
  } catch (error) {
    console.error("Error in getMyFriends controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function sendFriendRequest(req, res) {
  try {
    const myId = parseInt(req.user.id);
    const recipientId = parseInt(req.params.id);

    if (myId === recipientId) {
      return res.status(400).json({ message: "You can't send friend request to yourself" });
    }

    const recipient = await prisma.user.findUnique({ where: { id: recipientId } });
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    const isAlreadyFriend = await prisma.user.findFirst({
      where: {
        id: recipientId,
        friends: {
          some: {
            id: myId,
          },
        },
      },
    });

    if (isAlreadyFriend) {
      return res.status(400).json({ message: "You are already friends with this user" });
    }

    const existingRequest = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { senderId: myId, recipientId },
          { senderId: recipientId, recipientId: myId },
        ],
      },
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "A friend request already exists between you and this user" });
    }

    const friendRequest = await prisma.friendRequest.create({
      data: {
        senderId: myId,
        recipientId,
      },
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    console.error("Error in sendFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const requestId = parseInt(req.params.id);
    const userId = parseInt(req.user.id);

    const friendRequest = await prisma.friendRequest.findUnique({
      where: { id: requestId },
    });

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.recipientId !== userId) {
      return res.status(403).json({ message: "You are not authorized to accept this request" });
    }

    // Update request status
    await prisma.friendRequest.update({
      where: { id: requestId },
      data: { status: "accepted" },
    });

    // Add each user to the other's friends list
    await prisma.user.update({
      where: { id: friendRequest.senderId },
      data: {
        friends: { connect: { id: friendRequest.recipientId } },
      },
    });

    await prisma.user.update({
      where: { id: friendRequest.recipientId },
      data: {
        friends: { connect: { id: friendRequest.senderId } },
      },
    });

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.log("Error in acceptFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const userId = parseInt(req.user.id);

    const incomingReqs = await prisma.friendRequest.findMany({
      where: {
        recipientId: userId,
        status: "pending",
      },
      include: {
        sender: {
          select: {
            id: true,
            fullName: true,
            profilePic: true,
            nativeLanguage: true,
            learningLanguage: true,
          },
        },
      },
    });

    const acceptedReqs = await prisma.friendRequest.findMany({
      where: {
        senderId: userId,
        status: "accepted",
      },
      include: {
        recipient: {
          select: {
            id: true,
            fullName: true,
            profilePic: true,
          },
        },
      },
    });

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOutgoingFriendReqs(req, res) {
  try {
    const userId = parseInt(req.user.id);

    const outgoingRequests = await prisma.friendRequest.findMany({
      where: {
        senderId: userId,
        status: "pending",
      },
      include: {
        recipient: {
          select: {
            id: true,
            fullName: true,
            profilePic: true,
            nativeLanguage: true,
            learningLanguage: true,
          },
        },
      },
    });

    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


