#!/usr/bin/perl 

# Name: Desai, Rutvik
# Class Account#: jadrn010
# Project #1

#   file upload script.  
#   Remember that you MUST use enctype="mulitpart/form-data"
#   in the web page that invokes this script, and the destination 
#   directory for the uploaded file must have permissions set to 777.  
#   Do NOT set 777 permission on any other directory in your account!
#   
#   CS645, Spring 2017
#   Alan Riggins

use CGI;
use CGI::Carp qw (fatalsToBrowser);
use File::Basename;


$CGI::POST_MAX = 1024 * 10000; # Limit file size to 3MB
my $upload_dir = '/home/jadrn010/public_html/proj1/_uploadedimages';
my $safe_filename_chars = "a-zA-Z0-9_.-";

my $q = new CGI;
my $filename = $q->param("image_name");
unless($filename) {
die "There was a problem uploading the image; ";        
}


$filename =~ s/ //; #remove any spaces
if($filename !~ /^([$safe_filename_chars]+)$/) {
die "Sorry, invalid character in the filename.";
}   

$filename = untaint($filename);
$filename = lc($filename);
# get a handle on the uploaded image     
my $filehandle = $q->upload("image_upload"); 

unless($filehandle) { die "Invalid handle"; }

$message = "$upload_dir/$filename";
# save the file
open UPLOADFILE, ">$upload_dir/$filename" or die
"Error, cannot save the file.";
binmode UPLOADFILE;
while(<$filehandle>) {
print UPLOADFILE $_;
}
close UPLOADFILE;

print <<EOF;
Content-type:  text/html

<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
<meta http-equiv="content-type" 
content="text/html;charset=utf-8" />	
</head>
<body>
<h2>Success, the file $filename has been uploaded</h2>

<img src="/~jadrn000/proj1/_uploadedimages/$filename" />
</body>
</html>
EOF

# this is needed because mod_perl runs with -T (taint mode), and thus the
# filename is insecure and disallowed unless untainted. Return values
# from a regular expression match are untainted.
sub untaint {
if($filename =~ m/^(\w+)$/) { die "Tainted filename!"; }
return $1;
}
