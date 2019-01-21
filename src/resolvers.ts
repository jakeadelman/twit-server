import {ResolverMap} from './types/graphql-utils'
import {GQL} from './types/schema'
import {User} from './entity/User'
import {Quote} from './entity/Quote'
import {Tick} from './entity/Tick'
import {ChatMsg} from './entity/ChatMsg'
import {BitfinexTick} from './entity/BitfinexTick'
import {Tweet} from './entity/Tweet'
import {TwitchMsg} from './entity/TwitchMsg'
import {HourlySentiment} from './entity/HourlySentiment'

/* queries and mutations for db */

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, {name}: GQL.IHelloOnQueryArguments) =>
      `Hello ${name || 'World'}`,
    quote: async (_, {hour, symbol}: GQL.IQuoteOnQueryArguments) => {
      const t = await Quote.find({
        where: {
          hour: hour,
          symbol: symbol
        },
        select: [
          'id',
          'timestamp',
          'hour',
          'symbol',
          'bidSize',
          'bidPrice',
          'askPrice',
          'askSize'
        ]
      })
      return t
    },
    tick: async (_, {hour, symbol}: GQL.ITickOnQueryArguments) => {
      const t = await Tick.find({
        where: {hour: hour, symbol: symbol},
        select: [
          'id',
          'timestamp',
          'hour',
          'symbol',
          'side',
          'size',
          'price',
          'tickDirection',
          'trdMatchID'
        ]
      })
      console.log(t[0])
      return t
    },
    chatmsg: async (_, {hour, channelID}: GQL.IChatmsgOnQueryArguments) => {
      const t = await ChatMsg.find({
        where: {hour: hour, channelID: channelID},
        select: ['channelID', 'hour', 'fromBot', 'message']
      })
      console.log(t[0])
      return t
    },
    bitfinextick: async (_, {hour}: GQL.IBitfinextickOnQueryArguments) => {
      const t = await BitfinexTick.find({
        where: {hour: hour},
        select: [
          'timestamp',
          'hour',
          'bidPrice',
          'bidSize',
          'askPrice',
          'askSize',
          'dailyChange',
          'dailyChangePct',
          'dailyVolume',
          'dailyHigh',
          'dailyLow'
        ]
      })
      console.log(t[0])
      return t
    },
    tweet: async (_, {hour, tweetId}: GQL.ITweetOnQueryArguments) => {
      const t = await Tweet.find({
        where: {hour: hour, tweetId: tweetId},
        select: [
          'timestamp',
          'currHour',
          'hour',
          'screenName',
          'tweetId',
          'isRetweet',
          'isReplyTo',
          'text',
          'userMentions',
          'hashtags',
          'images',
          'urls',
          'replyCount',
          'retweetCount',
          'favoriteCount',
          'polarity',
          'searchTerm'
        ]
      })
      return t
    },
    hourlytweet: async (
      _,
      {currHour, searchTerm}: GQL.IHourlytweetOnQueryArguments
    ) => {
      const t = await Tweet.find({
        where: {currHour: currHour, searchTerm: searchTerm},
        select: [
          'timestamp',
          'currHour',
          'hour',
          'screenName',
          'tweetId',
          'isRetweet',
          'isReplyTo',
          'text',
          'userMentions',
          'hashtags',
          'images',
          'urls',
          'replyCount',
          'retweetCount',
          'favoriteCount',
          'polarity',
          'searchTerm'
        ]
      })
      return t
    },
    tweettenid: async (_, {searchTerm}: GQL.ITweettenidOnQueryArguments) => {
      const t = await Tweet.find({
        where: {searchTerm: searchTerm},
        select: [
          'timestamp',
          'currHour',
          'hour',
          'screenName',
          'tweetId',
          'isRetweet',
          'isReplyTo',
          'text',
          'userMentions',
          'hashtags',
          'images',
          'urls',
          'replyCount',
          'retweetCount',
          'favoriteCount',
          'polarity',
          'searchTerm'
        ],
        order: {
          id: 'DESC'
        },
        take: 10
      })
      return t
    },
    tweetfiftyid: async (
      _,
      {searchTerm}: GQL.ITweetfiftyidOnQueryArguments
    ) => {
      const t = await Tweet.find({
        where: {searchTerm: searchTerm},
        select: [
          'timestamp',
          'currHour',
          'hour',
          'screenName',
          'tweetId',
          'isRetweet',
          'isReplyTo',
          'text',
          'userMentions',
          'hashtags',
          'images',
          'urls',
          'replyCount',
          'retweetCount',
          'favoriteCount',
          'polarity',
          'searchTerm'
        ],
        order: {
          id: 'DESC'
        },
        take: 50
      })
      return t
    },
    twentyfourhoursentiment: async (
      _,
      {searchTerm}: GQL.ITwentyfourhoursentimentOnQueryArguments
    ) => {
      const t = await HourlySentiment.find({
        where: {searchTerm: searchTerm},
        select: ['sentiment', 'searchTerm'],
        order: {
          id: 'DESC'
        },
        take: 24
      })
      return t
    },
    twitchmsg: async (_, {hour}: GQL.ITwitchmsgOnQueryArguments) => {
      const t = await TwitchMsg.find({
        where: {hour: hour},
        select: ['timestamp', 'hour', 'text', 'emoji', 'channelName']
      })
      return t
    }
  },
  Mutation: {
    register: async (
      _,
      {email, password}: GQL.IRegisterOnMutationArguments
    ) => {
      const user = User.create({
        email,
        password
      })
      await user.save()
      return true
    },
    newquote: async (
      _,
      {
        timestamp,
        hour,
        symbol,
        bidSize,
        bidPrice,
        askPrice,
        askSize
      }: GQL.INewquoteOnMutationArguments
    ) => {
      const quote = Quote.create({
        timestamp,
        hour,
        symbol,
        bidSize,
        bidPrice,
        askPrice,
        askSize
      })
      await quote.save()
      return true
    },
    newhourlysentiment: async (
      _,
      {sentiment, searchTerm}: GQL.INewhourlysentimentOnMutationArguments
    ) => {
      const hSent = HourlySentiment.create({
        sentiment,
        searchTerm
      })
      await hSent.save()
      return true
    },
    newtick: async (
      _,
      {
        timestamp,
        hour,
        symbol,
        side,
        size,
        price,
        tickDirection,
        trdMatchID
      }: GQL.INewtickOnMutationArguments
    ) => {
      const tick = Tick.create({
        timestamp,
        hour,
        symbol,
        side,
        size,
        price,
        tickDirection,
        trdMatchID
      })
      await tick.save()
      return true
    },
    newchatmsg: async (
      _,
      {channelID, hour, fromBot, message}: GQL.INewchatmsgOnMutationArguments
    ) => {
      const chatmsg = ChatMsg.create({
        channelID,
        hour,
        fromBot,
        message
      })
      await chatmsg.save()
      return true
    },
    newbitfinextick: async (
      _,
      {
        timestamp,
        hour,
        bidPrice,
        bidSize,
        askPrice,
        askSize,
        dailyChange,
        dailyChangePct,
        dailyVolume,
        dailyHigh,
        dailyLow
      }: GQL.INewbitfinextickOnMutationArguments
    ) => {
      const bitfinextick = BitfinexTick.create({
        timestamp,
        hour,
        bidPrice,
        bidSize,
        askPrice,
        askSize,
        dailyChange,
        dailyChangePct,
        dailyVolume,
        dailyHigh,
        dailyLow
      })
      await bitfinextick.save()
      return true
    },
    newtweet: async (
      _,
      {
        timestamp,
        currHour,
        hour,
        screenName,
        tweetId,
        isRetweet,
        isPinned,
        isReplyTo,
        text,
        userMentions,
        hashtags,
        images,
        urls,
        replyCount,
        retweetCount,
        favoriteCount,
        polarity,
        searchTerm
      }: GQL.INewtweetOnMutationArguments
    ) => {
      const tweet = await Tweet.create({
        timestamp,
        currHour,
        hour,
        screenName,
        tweetId,
        isRetweet,
        isPinned,
        isReplyTo,
        text,
        userMentions,
        hashtags,
        images,
        urls,
        replyCount,
        retweetCount,
        favoriteCount,
        polarity,
        searchTerm
      })
      await tweet.save()
      return true
    },
    updatetweet: async (
      _,
      {
        hour,
        tweetId,
        replyCount,
        retweetCount,
        favoriteCount
      }: GQL.IUpdatetweetOnMutationArguments
    ) => {
      let newT = await Tweet.findOne({hour: hour, tweetId: tweetId})
      if (newT) {
        newT.replyCount = replyCount
        newT.retweetCount = retweetCount
        newT.favoriteCount = favoriteCount
        await newT.save()
        return true
      } else {
        return false
      }
    },
    newtwitchmsg: async (
      _,
      {
        timestamp,
        hour,
        text,
        emoji,
        channelName
      }: GQL.INewtwitchmsgOnMutationArguments
    ) => {
      let newM = await TwitchMsg.create({
        timestamp,
        hour,
        text,
        emoji,
        channelName
      })
      await newM.save()
      return true
    }
  }
}
