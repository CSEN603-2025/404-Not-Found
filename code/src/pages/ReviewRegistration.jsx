import { Building2, Factory, Users, Image as ImageIcon, Mail, Edit, Check } from "lucide-react";
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";

const companySizeLabels = {
  small: "Small (1-50 employees)",
  medium: "Medium (51-100 employees)",
  large: "Large (101-500 employees)",
  corporate: "Corporate (500+ employees)",
};

export function ReviewRegistration({ data, onEdit, onConfirm }) {
  return (
    <Card className="review-registration">
      <CardHeader>
        <CardTitle>Review Company Information</CardTitle>
        <CardDescription>Please review the details below before confirming registration.</CardDescription>
      </CardHeader>
      <CardContent className="review-content">
        <div className="review-item">
          <Building2 className="review-icon" />
          <div>
            <p className="review-label">Company Name</p>
            <p className="review-value">{data.companyName}</p>
          </div>
        </div>
        <div className="review-item">
          <Factory className="review-icon" />
          <div>
            <p className="review-label">Industry</p>
            <p className="review-value">{data.industry}</p>
          </div>
        </div>
        <div className="review-item">
          <Users className="review-icon" />
          <div>
            <p className="review-label">Company Size</p>
            <p className="review-value">{companySizeLabels[data.companySize]}</p>
          </div>
        </div>
        <div className="review-item">
          <Mail className="review-icon" />
          <div>
            <p className="review-label">Official Email</p>
            <p className="review-value">{data.email}</p>
          </div>
        </div>
        <div className="review-item">
          <ImageIcon className="review-icon" />
          <div>
            <p className="review-label">Company Logo</p>
            {data.logoUrl ? (
              <div className="review-logo-container">
                <img
                  src={data.logoUrl}
                  alt={`${data.companyName} Logo`}
                  className="review-logo"
                  onError={(e) => {
                    e.target.src = `https://picsum.photos/seed/${data.companyName}/100/100`;
                    e.target.alt = 'Placeholder Logo';
                  }}
                />
              </div>
            ) : (
              <p className="review-placeholder">No logo provided.</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="edit-button" onClick={onEdit}>
          <Edit className="button-icon" /> Edit
        </Button>
        <Button onClick={onConfirm}>
          Confirm Registration <Check className="button-icon" />
        </Button>
      </CardFooter>
    </Card>
  );
}