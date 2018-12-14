// tslint:disable
// graphql typescript definitions
export namespace GQL {
    interface IGraphQLResponseRoot {
        data?: IQuery | IMutation;
        errors?: Array<IGraphQLResponseError>;
    }

    interface IGraphQLResponseError {
        /** Required for all errors */
        message: string;
        locations?: Array<IGraphQLResponseErrorLocation>;
        /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
        [propName: string]: any;
    }

    interface IGraphQLResponseErrorLocation {
        line: number;
        column: number;
    }

    interface IQuery {
        __typename: "Query";
        hello: string;
        quote: Array<IQuote | null> | null;
        tick: Array<ITick | null> | null;
        chatmsg: Array<IChatMsg | null> | null;
        bitfinextick: Array<IBitfinexTick | null> | null;
    }

    interface IHelloOnQueryArguments {
        name?: string | null;
    }

    interface IQuoteOnQueryArguments {
        timestamp?: string | null;
        hour?: string | null;
        symbol?: string | null;
        bidSize?: number | null;
        bidPrice?: number | null;
        askPrice?: number | null;
        askSize?: number | null;
    }

    interface ITickOnQueryArguments {
        timestamp?: string | null;
        hour?: string | null;
        symbol?: string | null;
        side?: string | null;
        size?: number | null;
        price?: number | null;
        tickDirection?: string | null;
        trdMatchID?: string | null;
    }

    interface IChatmsgOnQueryArguments {
        channelID: number;
        hour: string;
        fromBot: boolean;
    }

    interface IBitfinextickOnQueryArguments {
        timestamp?: string | null;
        hour: string;
        bidPrice?: number | null;
        bidSize?: number | null;
        askPrice?: number | null;
        askSize?: number | null;
        dailyChange?: number | null;
        dailyChangePct?: number | null;
        dailyVolume?: number | null;
        dailyHigh?: number | null;
        dailyLow?: number | null;
    }

    interface IQuote {
        __typename: "Quote";
        timestamp: string;
        symbol: string;
        bidSize: number;
        bidPrice: number;
        askPrice: number;
        askSize: number;
    }

    interface ITick {
        __typename: "Tick";
        timestamp: string;
        hour: string;
        symbol: string;
        side: string;
        size: number;
        price: number;
        tickDirection: string;
        trdMatchID: string;
    }

    interface IChatMsg {
        __typename: "ChatMsg";
        channelID: number;
        hour: string;
        fromBot: boolean;
        message: string;
    }

    interface IBitfinexTick {
        __typename: "BitfinexTick";
        timestamp: string;
        hour: string;
        bidPrice: number;
        bidSize: number;
        askPrice: number;
        askSize: number;
        dailyChange: number;
        dailyChangePct: number;
        dailyVolume: number;
        dailyHigh: number;
        dailyLow: number;
    }

    interface IMutation {
        __typename: "Mutation";
        register: boolean | null;
        newquote: boolean | null;
        newtick: boolean | null;
        newchatmsg: boolean | null;
        newbitfinextick: boolean | null;
    }

    interface IRegisterOnMutationArguments {
        email: string;
        password: string;
    }

    interface INewquoteOnMutationArguments {
        timestamp: string;
        hour: string;
        symbol: string;
        bidSize: number;
        bidPrice: number;
        askPrice: number;
        askSize: number;
    }

    interface INewtickOnMutationArguments {
        timestamp: string;
        hour: string;
        symbol: string;
        side: string;
        size: number;
        price: number;
        tickDirection: string;
        trdMatchID: string;
    }

    interface INewchatmsgOnMutationArguments {
        channelID: number;
        hour: string;
        fromBot: boolean;
        message: string;
    }

    interface INewbitfinextickOnMutationArguments {
        timestamp: string;
        hour: string;
        bidPrice: number;
        bidSize: number;
        askPrice: number;
        askSize: number;
        dailyChange: number;
        dailyChangePct: number;
        dailyVolume: number;
        dailyHigh: number;
        dailyLow: number;
    }
}

// tslint:enable
