import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Image,
    Text,
    View,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import Toast from '../utils/Toast';
import Color from '../utils/Color';
import Dimen from '../utils/Dimen';
import Network from '../utils/NetworkUtil';
import BaseComponent from '../base/BaseComponent';


var {width,height} = require('Dimensions').get('window');

/**
 * 业界统计
 */
class AchievementView extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = { 
            info: null,

            // isRefreshing: false, //初始化不刷新
            // emptyHint:'加载数据中...',
            // animating:false,
        };
    }
    // hasMore=false;//是否加载更多


    // _onRefresh() {  
    //     this.setState({isRefreshing: true});  
    //     setTimeout(() => {  
    //       // 准备下拉刷新的5条数据  
    //     //   const rowData = Array.from(new Array(5))  
    //     //   .map((val, i) => ({  
    //     //     text: '刷新行 ' + (+this.state.loaded + i)  
    //     //   }))  
    //     //   .concat(this.state.rowData);  

    //     getAchievements();
       
    //       this.setState({  
    //         // loaded: this.state.loaded + 5,  
    //         // isRefreshing: false,  
    //         // rowData: rowData,  
    //       });  
    //     }, 2000);  
    //   }
  

    render() {
        return (
            <View>
                {this.getStatusBar()}
               
        
     
                <Text style={(styles.dateStyle)}>{this.state.info!=null&&this.state.info.updateDate!=null?this.state.info.updateDate:''}更新</Text>
                <View style={styles.itemBgStyle}>
             
                    {/* <View style={{flexDirection:'row',alignItems:'center'}}>
                    
                        <Image source={require('../../image/ic_money.png')} style={{height:20,width:20,marginRight:6}}/>
                        <Text style={styles.moneyStyle}>{this.state.info!=null?this.state.info.money:'0'}</Text>
                    </View> */}
                    <Text style={styles.titleStyle}>当月核销金额(元)</Text>
                    <Text style={{marginTop:20,marginLeft:12,color:Color.text_deep_red,fontSize:Dimen.text_x_max_size,fontWeight:'bold'}}>{this.state.info!=null&&this.state.info.money!=null?this.state.info.money:'0'}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:1}}>
                    <View style={[styles.itemBgStyle,{flex:1,marginRight:1}]}>
                        <Text style={styles.titleStyle}>核销购票单数</Text>
                        <Text style={styles.moneyStyle}>{this.state.info!=null&&this.state.info.verifyTicket!=null?this.state.info.verifyTicket:'0'}</Text>
                       
                    </View>
                    <View style={[styles.itemBgStyle,{flex:1}]}>
                        <Text style={styles.titleStyle}>核销团体订单数</Text>
                        
                        <Text style={styles.moneyStyle}>{this.state.info!=null&&this.state.info.verifyGroup!=null?this.state.info.verifyGroup:'0'}</Text>
                       
                    </View>
                </View>
                <Text style={{marginTop:20,marginLeft:12,color:Color.text_deep_grey,fontSize:Dimen.text_smal_size}}>每天24点更新当月数据</Text>
                {this.state.animating && <ActivityIndicator
                    animating={this.state.animating}
                    style={{position:'absolute',marginLeft:width/2-20,marginTop:height/2-40}}
                    size="large" />}
            </View>

            //=================
            
            //===============




            
        );
    }




    componentDidMount(){
        this.getAchievements();
    }

    //获取二维码
    getAchievements(){
        if(false){
            let testData = require('../testData/Achievement.json');
            this.setState({
                info: testData,
            });
            return;
        }
        this.setState({animating:true});
        var that = this;
        Network.post('achievement', null, function(result, error){
            that.setState({animating:false});
            if(result!=null){
             
                that.setState({
                  
                    info: result,
                   
                });
            }else{
                Toast.show(error);
                setTimeout(function() {
                    that.props.navigation.goBack();
                }, 800);
            }
        });
    }
}






const styles = StyleSheet.create({  
    moneyStyle: { 
        fontSize:Dimen.text_max_size,
        color:Color.text_red,
        fontWeight:'bold',
        marginTop: 15,
    },
    titleStyle: { 
        fontSize:Dimen.text_normal_size,
        color:Color.text_deep_black,
        marginTop:12
    },
    itemBgStyle:{
        alignItems:'center',
        backgroundColor:'#fff',
        paddingTop:15,
        paddingBottom:20
    },

    dateStyle:{
        alignItems:'flex-start',
        backgroundColor:'#FFFFFF',
        paddingTop:20,
        paddingLeft: 20,
        paddingBottom:20
    },
    dateStyle:{
        alignItems:'flex-start',
        backgroundColor:'#FFFFFF',
        paddingTop:20,
        paddingLeft: 20,
        paddingBottom:20
    },

    
});


module.exports = AchievementView;