import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {

  post: Post;
  constructor(private dataSrv: DataServiceService, private router: Router) {
    this.post = new Post();
  }

  ngOnInit() {
  }

  onSubmit() {
	if (this.post.title != null && this.post.url != null && this.post.content != null) {
		this.dataSrv.addPost(this.post).subscribe( (post) => {
		  console.log(post);
		  this.router.navigateByUrl('/blog');
		});
	}
  }

}

class Post {
  title?: string;
  url?: string;
  content?: string;
}