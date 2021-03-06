import * as React from "react";
import { API_KEY_PIXABAY } from '../ApiKey';
import { SEARCH_BACKGROUND_KEYWORD_0, SEARCH_BACKGROUND_KEYWORD_1 } from "../AppConfig";

// Interface
interface IBackground {
    winHeight: number,
    backgroundImgUrl: string,
    apiError: boolean,
}

export default class Background extends React.Component<{}, IBackground> {

    constructor(props: any) {
        super(props);
        this.state = {
            winHeight: window.innerHeight,
            backgroundImgUrl: "",
            apiError: false,
        }
    }

    public render() {
        return (
            <div id="background"
                style={{
                    backgroundImage: `url(${this.state.backgroundImgUrl})`,
                    height: this.state.winHeight,
                }}
            />
        );
    }

    public updateResolution = () => {
        this.setState({ winHeight: window.innerHeight });
    }

    public componentDidMount() {
        const random = Math.floor(Math.random() *2);
        let keyword = "";
        keyword = random === 0? SEARCH_BACKGROUND_KEYWORD_0 : SEARCH_BACKGROUND_KEYWORD_1;
        this.getBackgroundImage(keyword);
        window.addEventListener('resize', this.updateResolution);
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.updateResolution);
    }

    // Search for background picture using the keyword specified in AppConfig.tsx file
    public getBackgroundImage = (keyword: string) => {
        const random = Math.floor(Math.random() *3);
        let randomOrderParam = "";
        switch (random) {
            case 0:
                randomOrderParam = "latest";
                break;
            case 1:
                randomOrderParam = "popular";
            break;
            case 2:
            default:
                randomOrderParam = "upcoming";
            break;
        }
        const url = "https://pixabay.com/api/?key=" + API_KEY_PIXABAY + "&q=" + keyword + "&cat=nature&order=" + randomOrderParam + "&image_type=photo&safesearch=true";
        fetch(url)
            .then(response => response.json())
            .then((out) => {
                // After finding a list of images, it randomly selects one to be the background picture for this webapp
                if (out.hits !== undefined) {
                    if (out.hits.length >= 3) {
                        const randNum = Math.floor(Math.random() * out.hits.length);
                        this.setState({ backgroundImgUrl: out.hits[randNum].largeImageURL });
                    }
                }
            })
            .catch(err => {
                if (!this.state.apiError) {
                    this.setState({ apiError: true })
                }
            });
    }
}