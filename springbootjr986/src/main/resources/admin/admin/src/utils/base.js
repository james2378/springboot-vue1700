const base = {
    get() {
        return {
            url : "http://localhost:8080/springbootjr986/",
            name: "springbootjr986",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/springbootjr986/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "基于大数据的智能家居销量数据分析"
        } 
    }
}
export default base
