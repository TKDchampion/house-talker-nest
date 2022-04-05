-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "tips" TEXT NOT NULL,
    "summaryContent" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "isHiddenName" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
