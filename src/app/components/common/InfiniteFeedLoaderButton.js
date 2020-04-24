import {Button, Row, Spin} from "antd";
import React from "react";

export default class InfiniteFeedLoaderButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            extraLoadingLabel: '',
        }
    }

    startLoading = () => {
        if (this.props.loaderFunction) {
            this.props.loaderFunction();
            this.startMakingExtraLabels();
        }
    }
    startMakingExtraLabels = () => {
        let that = this;
        this.setState(function (prevState) {
            if (prevState.extraLoadingLabel.length > 2) {
                return {extraLoadingLabel: ''}
            } else {
                return {extraLoadingLabel: prevState.extraLoadingLabel + '.'}
            }
        }, function () {
            if (that.props.loading)
                setTimeout(function () {
                    that.startMakingExtraLabels();
                }, 500)
        })
    }

    render() {
        if (this.props.loading) {
            return <Spin spinning={this.props.loading}>
                <Row style={{minHeight: 200}}/>
            </Spin>
        }
        if (this.props.hidden) {
            return <Row>
                <div style={{textAlign: 'center', margin: '15px 0px'}}>
                    <small>No More Data Found</small>
                </div>
            </Row>
        }
        return <Row>
            <div style={{textAlign: 'center', margin: '15px 0px'}}>
                <Button type={'primary'} onClick={this.startLoading} loading={this.props.loading}>
                    {this.props.loading ? 'Loading' + this.state.extraLoadingLabel : 'Load More'}
                </Button>
            </div>
        </Row>
    }
}
