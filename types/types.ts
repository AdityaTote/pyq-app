export interface IYearData {
    _id: string,
    sem: string[],
    title: string
}

export interface ISemData {
    _id: string,
    title: string
    sem: {
        _id: string,
        title: string,
        subject: string[]
    }[],
}

export interface ISubData {
    _id: string,
    title: string
    subject: {
        _id: string,
        title: string,
        subject: string[]
    }[],
}

export interface IPaperData {
    _id: string,
    title: string
    paper: {
        _id: string,
        title: string,
        link: string
    }[],
}

export interface IPDFViewer {
    _id: string;
    link: string;
    title: string;
}

/**
 {"_id": "67c42aa734d8d69784d38f6a", 
 "link": "https://d3u0uf6tnodpp9.cloudfront.net/second-year/sem-4/Energy Conversion-I/Energy Conversion-I Winter-2022.pdf", 
 // "title": "EC-I W-22"}
 */