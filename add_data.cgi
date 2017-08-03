#!/usr/bin/perl

# Name: Desai, Rutvik
# Class Account#: jadrn010
# Project #1

use CGI;
use DBI;

my $cgi = CGI->new;

my $sku = $cgi->param('sku');
my $catID = $cgi->param('category');
my $venID = $cgi->param('vendor');
my $manuID = $cgi->param('manuID');
my $description = $cgi->param('desc');
my $features= $cgi->param('features');
my $cost = $cgi->param('cost');
my $retail = $cgi->param('retail');
my $image = $cgi->param('image');

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn010";
my $username = "jadrn010";
my $password = "shovel"; 
my $database_source = "dbi:mysql:$database:$host:$port";

my $newdbh = DBI->connect($database_source, $username, $password)
or die 'Cannot connect to db';

my $message = " ";


my $sql = $newdbh->prepare("INSERT INTO product (sku,catID,venID,
manuID,description,features,cost,retail,image) VALUES ('$sku', '$catID','$venID','$manuID','$description','$features','$cost','$retail','$image')");
#$sql->execute() or die $DBI::errstr;


if ($sql->execute()) {
$message = "Success";
}
else {
$message = "Error"
}
$sql->finish();
$newdbh->disconnect();

print "Content-type: text/html\n\n";
print $message;
