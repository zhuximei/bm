let gulp=require('gulp');
gulp.task("copy-html", async ()=>{
	gulp.src("bm.html").pipe(gulp.dest("D:\\phpStudy\\WWW\\bm"));
	gulp.src("zhuce.html").pipe(gulp.dest("D:\\phpStudy\\WWW\\bm"));
});


gulp.task("watchall",async ()=>{
	gulp.watch("*.html",async ()=>{
		gulp.src("*.html").pipe(gulp.dest("D:\\phpStudy\\WWW\\bm"));
	});
