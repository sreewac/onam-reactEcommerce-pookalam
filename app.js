function sign(lm,m,ce1,ce2,x,y)
    {
        x1=lm+x;
        y1=lm*m+y;
        if(((ce1-x1)*(ce1-x1)+(ce2-y1)*(ce2-y1))>((ce1-x)*(ce1-x)+(ce2-y)*(ce2-y)))
        {
        //goes away from centre
            return lm;
        }
        else
            return -lm;
    }
    
    function cone(ctx,x1,y1,x2,y2,ce1,ce2,color,opt)
    {
        //draw petal
        //find 3 and 4
        x3=0
        y3=0
        x4=0
        y4=0
        l=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
        if(opt==1)
            l*=1.0;
        else
            l*=0.8;
        if((color=="blue")||(color=="rgb(0,159,255)")) //to reduce size of blue
            l*=0.9;
        if(y2==y1) //if slope infinity
        {
            x3=x1;
            x4=x2;
            y3=l+y1;
            y4=l+y2;
        }
        else
        {
            m=-(x2-x1)/(y2-y1); //slope
            lm=l/Math.sqrt(m*m+1);
            //x=lm+x1 y=lm*m+y1 need to check if distance from centre increase or decrease
            si=sign(lm,m,ce1,ce2,x1,y1); //returns -lm or +lm
            x3=x1+si;
            y3=y1+si*m; 
            si=sign(lm,m,ce1,ce2,x2,y2);
            x4=x2+si;
            y4=si*m+y2;
        }
        
        //draw
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        if(opt==1)// inner petals
        {
        ctx.quadraticCurveTo((x1+x3)/2,(y1+y3)/2,(x3+x4)/2,(y3+y4)/2);
        ctx.quadraticCurveTo((x2+x4)/2,(y2+y4)/2,x2,y2);
        }
        else //outer petals
        {
        ctx.bezierCurveTo(x3,y3,(x1+x2)/2,(y1+y2)/2,(x3+x4)/2,(y3+y4)/2);
        ctx.bezierCurveTo((x1+x2)/2,(y1+y2)/2,x4,y4,x2,y2)
        }
        ctx.lineTo(x1,y1);
        ctx.fillStyle=color;
        ctx.fill();
        ctx.closePath();
    }
    
    
    a=document.getElementById("poo");
    ctx=a.getContext("2d");
    ctx.fillStyle="#ffffff";
    ctx.fillRect(0,0,800,800);
    //parameters of outer petals
    r=300;
    ce1=400;
    ce2=400;
     a=["rgb(27, 11, 28)","#c71c1f","orange","#f7d66a","green","#FFEEAF"];
    
    r-=r*2/10;
    degc=50;
    start=45*Math.PI/180;
    for(j=0;j<a.length;j++)
    {
        for(i=start;i<=2*Math.PI+start;i+=45*Math.PI/180)
        {
            cone(ctx,r*Math.cos(i)+ce1,r*Math.sin(i)+ce2,r*Math.cos(i+degc*Math.PI/180)+ce1,r*Math.sin(i+degc*Math.PI/180)+ce2,ce1,ce2,a[j],2);
        }
        r-=10;
        start+=45*Math.PI/180;
        if(r<=0)
            break;
    }
    degc=20;
    start=0;
        for(j=0;j<a.length;j++)
    {
        for(i=start;i<=2*Math.PI+start;i+=10*Math.PI/180)
        {
            cone(ctx,r*Math.cos(i)+ce1,r*Math.sin(i)+ce2,r*Math.cos(i+degc*Math.PI/180)+ce1,r*Math.sin(i+degc*Math.PI/180)+ce2,ce1,ce2,a[j],1);
        }
        r-=10;
        start+=5*Math.PI/180;
        if(r<=0)
            break;
    }
    r+=10;
    ctx.beginPath();
    ctx.ellipse(ce1,ce2,r,r,0,0,2*Math.PI);
    ctx.fillStyle="#FFEEAF";
    ctx.fill();
    ctx.closePath();
    
    //inner ellipse hands
    a1=["#A10035","#c71c1f","#FEB139","#f7d66a","#FF8D29","#AF0404"];
    start=0;
    for(j=0;j<15;j++)
    {
    for(i=a.length-1;i>=0;i--)
    {
        ctx.beginPath();
        ctx.ellipse(ce1,ce2,r,r/10,10*i+start,0,2*Math.PI);
        ctx.fillStyle=a1[i];
        ctx.fill();
        ctx.closePath();
    }
    start+=6;
    r-=10;
    }