/**
 * banner数据
 */ 
function getBannerData(){
    var arr = ['../../images/banner_01.png', '../../images/banner_02.png', '../../images/banner_03.png', '../../images/banner_04.png']
    return arr
}
/*
 * 首页 navnav 数据
 */ 
function getIndexNavData(){
    var arr = [
            {
                id:1,
                icon:"../../../image/nav_icon_01.png",
                title:"蔬菜"
            },
            {
                id:2,
                icon:"../../../image/nav_icon_02.png",
                title:"日用品"
            },
            {
                id:3,
                icon:"../../../image/nav_icon_03.png",
                title:"药品"
            },
            {
                id:4,
                icon:"../../../image/nav_icon_04.png",
                title:"书籍"
            },
            {
                id:5,
                icon:"../../../image/prompt.png",
                title:"其它"
            }
        ]
    return arr
}
/*
 * 首页 对应 标签 数据项
 */ 
function getIndexNavSectionData(){
    var arr = [
                [
                    {
                        
                        subject:"蔬菜采购",
                        coverpath:"../../../image/recommend_img_01.png",
                        price:'9:00-10:00',
                        message:'居安小区内'
                    },
                    {
                        
                        subject:"好又多超市日用品采购",
                        coverpath:"../../../image/recommend_img_02.png",
                        price:'12：00-13：00',
                        message:'和园小区2公里内可送'
                    },
                    {
                        
                        subject:"便民药店非处方药代购",
                        coverpath:"../../../image/recommend_img_03.png",
                        price:'11：30-14：30',
                        message:'保利小区可送'
                    },
                    {
                        
                        subject:"新华书店图书购置",
                        coverpath:"../../../image/recommend_img_05.png",
                        price:'11月30日 上午',
                        message:'中海凯旋门五本书内可送'
                    },
                    {
                        
                        subject:" 和园小区代交水费",
                        coverpath:"../../../image/recommend_img_07.png",
                        price:'¥198',
                        message:'11月水费代缴'
                    }
                ],
                [
                    {
                        artype:'nails',
                        subject:"好又多超市日用品采购",
                        coverpath:"../../../image/recommend_img_02.png",
                        price:'12：00-13：00',
                        message:'和园小区2公里内可送'
                    }
                ],
                [
                    {
                        artype:'beauty',
                        subject:"便民药店非处方药代购",
                        coverpath:"../../../image/recommend_img_03.png",
                        price:'11：30-14：30',
                        message:'保利小区可送'
                    },
                    {
                        artype:'beauty',
                        subject:" 泰康医院非处方药代购",
                        coverpath:"../../../image/recommend_img_03.png",
                        price:'12：00-18：00',
                        message:'仅限保利小区内，且非急用'
                    }
                ],
                [
                    
                    {
                        artype:'hair',
                        subject:"二手书店购书",
                        coverpath:"../../../image/recommend_img_05.png",
                        price:'11月30日 下午',
                        message:'中海小区2kg内可送'
                    }
                ],
                [
                    {
                        artype:'eyelash',
                        subject:"代跑腿",
                        coverpath:"../../../image/recommend_img_06.png",
                        price:'08：00-12：00',
                        message:'和园小区出发，南京大学鼓楼校区内均可'
                    }
                ] 
            ]
    return arr
}
/**
 * 技师 数据
 * */ 
function getSkilledData(){
    var arr = [
                {
                        company:"西狮独品美容美发有限公司",
                        avatar:"../../images/skilledt_img_01.png",
                        nickname:'张技师',
                        price:'¥500',
                        message:'从事美发行业60余年，有丰富经验',
                        distance:'100m'
                    },
                    {
                        company:"圆月亮美甲沙龙",
                        avatar:"../../images/skilledt_img_02.png",
                        nickname:'包技师',
                        price:'¥800',
                        message:'从事美发行业60余年，有丰富经验',
                        distance:'200m'
                    },
                    {
                        company:"璀璨美睫会所",
                        avatar:"../../images/skilledt_img_03.png",
                        nickname:'王技师',
                        price:'¥600',
                        message:'从事美发行业60余年，有丰富经验',
                        distance:'100m'
                    },
                    {
                        company:"柔丝妮美容养生馆",
                        avatar:"../../images/skilledt_img_04.png",
                        nickname:'黄技师',
                        price:'¥800',
                        message:'从事美发行业60余年，有丰富经验',
                        distance:'400m'
                    }
            ]
    return arr
}

/**
 * 选择器 数据
 */ 
function getPickerData(){
    var arr =[
        {
            name:'张三',
            phone:'13812314563',
            province:'北京',
            city:'北京',
            addr:'朝阳区望京悠乐汇A座8011'
        },
        {
            name:'李四',
            phone:'13812314563',
            province:'北京市',
            city:'北京市',
            addr:'朝阳区望京悠乐汇A座4020'
        }
    ]
    return  arr
}
/**
 * 查询 地址
 * */ 
var user_data = userData()
function searchAddrFromAddrs(addrid){
    var result
    for(let i=0;i<user_data.addrs.length;i++){
        var addr = user_data.addrs[i]
        console.log(addr)
        if(addr.addrid == addrid){
            result = addr
        }
    }
    return result || {}
}
/**
 * 用户数据
 * */ 
function userData(){
    var arr = {
                uid:'1',
                nickname:'山炮',
                name:'张三',
                phone:'13833337998',
                avatar:'../../images/avatar.png',
                addrs:[
                   {
                        addrid:'1',
                        name:'张三',
                        phone:'13812314563',
                        province:'北京',
                        city:'直辖市',
                        addr:'朝阳区望京悠乐汇A座8011'
                    },
                    {
                        addrid:'2',
                        name:'李四',
                        phone:'13812314563',
                        province:'北京',
                        city:'直辖市',
                        addr:'朝阳区望京悠乐汇A座4020'
                    } 
                ]
            }
    return arr
}
/**
 * 省
 * */ 
function provinceData(){
    var arr = [
        // {pid:1,pzip:'110000',pname:'北京市'},
        // {pid:2,pzip:'120000',pname:'天津市'}
        '请选择省份','福建省'
    ]
    return arr
}
/**
 * 市
 * */ 
function cityData(){
    var arr = [
        // {cid:1,czip:'110100',cname:'市辖区',pzip:'110000'},
        // {cid:2,czip:'120100',cname:'市辖区',pzip:'120000'}
        '请选择城市','福州市','厦门市','宁德市'
    ]
    return arr
}
/*
 * 对外暴露接口
 */ 
module.exports = {
  getBannerData : getBannerData,
  getIndexNavData : getIndexNavData,
  getIndexNavSectionData : getIndexNavSectionData,
  getPickerData : getPickerData,
  getSkilledData :getSkilledData,
  userData : userData,
  provinceData : provinceData,
  cityData : cityData,
  searchAddrFromAddrs : searchAddrFromAddrs

}